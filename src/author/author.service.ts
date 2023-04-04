import { db } from "@/utils/db.server";

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

// GET All authors
const getAuthors = (limit?: number): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    take: limit ? limit : 100,
  });
};

// GET a single author by Id
const getAuthor = (id: string): Promise<Author | null> => {
  return db.author.findFirst({
    where: {
      id,
    },
  });
};

// POST create a new author
const createAuthor = (author: Omit<Author, "id">): Promise<Author> => {
  return db.author.create({
    data: {
      firstName: author.firstName,
      lastName: author.lastName,
    },
  });
};

// PUT update an author already exist
const updateAuthor = (id: string, author: Omit<Author, "id">) => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

// DELETE: delete an author already exists
const deleteAuthor = (id: string) => {
  return db.author.delete({
    where: {
      id,
    },
  });
};

export { createAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor };
