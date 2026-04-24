class SupabaseDB:
    def __init__(self, client):
        self.client = client

    def insert(self, table, value):
        return self.client.table(table).insert(value).execute()

    def get_by_id(self, table, id):
        query_result = self.client.table(table).select("*").eq("id", id).execute()
        if len(query_result.data) > 1:
            raise ValueError("Query returned more than 1 value")
        if len(query_result.data) == 0:
            return None
        return query_result.data[0]

    def get_by(self, table, col, value):
        return self.client.table(table).select("*").eq(col, value).single().execute()

    def get_by_list(self, table, col, value):
        return self.client.table(table).select("*").eq(col, value).execute()


if __name__ == "__main__":
    pass
