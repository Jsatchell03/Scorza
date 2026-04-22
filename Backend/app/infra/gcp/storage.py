from google.cloud import storage
from google.cloud.exceptions import PreconditionFailed
import requests
import os
from dotenv import load_dotenv
import mimetypes
import magic
import io


load_dotenv()


storage_client = storage.Client.from_service_account_json(os.getenv("INIT_TSDB_SA"))


class StreamingBody(io.RawIOBase):
    """Wraps a generator into a file-like object GCS can read from."""

    def __init__(self, gen):
        self._gen = gen
        self._buf = b""

    def readable(self):
        return True

    def seekable(self):
        return False

    def seekable(self):
        return True

    def tell(self):
        return 0

    def seek(self, pos, whence=0):
        return 0

    def readinto(self, bytearr):
        try:
            while not self._buf:
                self._buf = next(self._gen)
            byte_len = len(bytearr)
            output, self._buf = self._buf[:byte_len], self._buf[byte_len:]
            bytearr[: len(output)] = output
            return len(output)
        except StopIteration:
            return 0


def upload_from_url(
    url: str,
    bucket_name: str,
    file_name: str,
    allowed_types={
        "image/png",
        "image/jpeg",
        "image/webp",
        "application/pdf",
    },
    chunk_size: int = 1024 * 1024,
) -> str:

    bucket = storage_client.bucket(bucket_name)

    with requests.get(url, stream=True, timeout=15) as response:
        response.raise_for_status()
        content_length = response.headers.get("Content-Length")
        size = int(content_length) if content_length else None
        initial_chunk = next(response.iter_content(chunk_size=4096), None)
        if not initial_chunk:
            raise ValueError(f"Empty response body from ({url})")

        detected_mime = magic.from_buffer(initial_chunk, mime=True)
        if detected_mime not in allowed_types:
            raise ValueError(f"Unsupported file type: {detected_mime}")

        extension = mimetypes.guess_extension(detected_mime) or ""
        blob_name = f"{file_name}{extension}"
        blob = bucket.blob(blob_name)

        MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

        def stream_generator():
            total = len(initial_chunk)
            yield initial_chunk
            for chunk in response.iter_content(chunk_size=chunk_size):
                if chunk:
                    total += len(chunk)
                    if total > MAX_FILE_SIZE:
                        raise ValueError(
                            f"File exceeds max size of {MAX_FILE_SIZE} bytes"
                        )
                    yield chunk

        file_obj = io.BufferedReader(
            StreamingBody(stream_generator()), buffer_size=chunk_size
        )

        try:
            blob.upload_from_file(
                file_obj,
                content_type=detected_mime,
                rewind=False,
                size=size,
                if_generation_match=0,  # only upload if object doesn't exist
            )
            print("File uploaded to GCS")
            return f"gs://{bucket_name}/{blob_name}"
        except PreconditionFailed:
            print("File already uploaded to GCS")
            return f"gs://{bucket_name}/{blob_name}"


if __name__ == "__main__":
    pass
