class SupabaseDB:
    def __init__(self, client):
        self.client = client

    def insert(self, table, value):
        return (
            self.client.table(table)
            .insert(
                value.model_dump(exclude_unset=True, exclude_none=True, mode="json")
            )
            .execute()
        )

    def get_by_id(self, table, id):
        return self.client.table(table).select("*").eq("id", id).single().execute()

    def get_by(self, table, col, value):
        return self.client.table(table).select("*").eq(col, value).single().execute()

    def get_by_list(self, table, col, value):
        return self.client.table(table).select("*").eq(col, value).execute()


if __name__ == "__main__":
    pass
