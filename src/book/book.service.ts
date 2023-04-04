import { db } from "@/utils/db.server";

type Book = {
  id: string;
  title: string;
  pageSize: number;
  publishedDate: Date;
};

export type CreateBook = {
  title: string;
  pageSize: number;
  publishedDate: Date;
  authorId: string;
};

// GET all books
const getBooks = (limit: number): Promise<Book[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      pageSize: true,
      publishedDate: true,
    },
    take: limit ? limit : 100,
  });
};

// GET a single book
const getBook = (id: string): Promise<Book | null> => {
  return db.book.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      pageSize: true,
      publishedDate: true,
    },
  });
};

// POST create a new book
const createBook = (book: CreateBook): Promise<CreateBook> => {
  const { title, pageSize, publishedDate, authorId } = book;
  const parsedDate: Date = new Date(publishedDate);
  return db.book.create({
    data: {
      title,
      pageSize,
      publishedDate: parsedDate,
      authorId,
    },
    select: {
      id: true,
      title: true,
      pageSize: true,
      publishedDate: true,
      authorId: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

// PUT update an book already exist
export const updateBook = (id: string, book: CreateBook) => {
  return db.book.update({
    where: {
      id,
    },
    data: {
      authorId: book.authorId,
      pageSize: book.pageSize,
      publishedDate: book.publishedDate,
      title: book.title,
    },
    select: {
      id: true,
      title: true,
      pageSize: true,
      publishedDate: true,
      authorId: true,
    },
  });
};

// DELETE: delete an book already exists
export const deleteBook = (id: string) => {
  return db.book.delete({
    where: {
      id,
    },
  });
};

export { createBook, getBook, getBooks };
