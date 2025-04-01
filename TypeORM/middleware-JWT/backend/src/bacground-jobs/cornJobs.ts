import { AppDataSource } from "../data-source";
import { Books } from "../entity/Book";
import cron from "node-cron";

const insertBook = async () => {
  const bookRepository = AppDataSource.getRepository(Books);

  try {
    const newBook = new Books();
    newBook.bookName = `Book_${Date.now()}`;

    await bookRepository.save(newBook);
    console.log("New book added:", newBook.bookName);
  } catch (error: any) {
    console.error("Error inserting book:", error.message);
  }
};

export const InsertBook = () => {
  cron.schedule("*/1 * * * * *", async () => {
    console.log("Running cron job...");
    await insertBook();
  });
};
