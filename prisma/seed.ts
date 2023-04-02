import { db } from "@/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  pageSize: number;
  publishedDate: Date;
};

const getAuthors = (): Array<Author> => {
  return [
    {
      firstName: "Howard",
      lastName: "Pyle",
    },
    {
      firstName: "Hans Christian",
      lastName: "Andersen",
    },
    {
      firstName: "Mark",
      lastName: "Twain",
    },
    {
      firstName: "Grimm",
      lastName: "Brothers",
    },
    {
      firstName: "Lyman Frank",
      lastName: "Baum",
    },
  ];
};

const getBooks = (): Array<Book> => {
  return [
    {
      title: "Robin Hood",
      pageSize: 240,
      publishedDate: new Date(),
    },
    {
      title: "Andersen's Fairy Tales",
      pageSize: 150,
      publishedDate: new Date(),
    },
    {
      title: "The Wizard of Oz",
      pageSize: 190,
      publishedDate: new Date(),
    },
    {
      title: "The Adventures of Huckleberry Finn",
      pageSize: 140,
      publishedDate: new Date(),
    },
    {
      title: "Fairy Tales",
      pageSize: 99,
      publishedDate: new Date(),
    },
  ];
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  const author = await db.author.findFirst({
    where: {
      firstName: "Hans Christian",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, pageSize, publishedDate } = book;
      return db.book.create({
        data: {
          title,
          pageSize,
          publishedDate,
          authorId: author!.id,
        },
      });
    })
  );
}

seed();
