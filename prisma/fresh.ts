import { db } from "@/utils/db.server";

// clear the database
const fresh = async () => {
  await db.author.deleteMany();
  await db.book.deleteMany();
};

fresh();
