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
  } catch (error) {
    
    console.error(error instanceof Error ? error.message :"Failed to insert data");
  }
};

export const InsertBook = () => {
  cron.schedule("*/1 * * * * *", async () => {
    console.log("Running cron job...");
    await insertBook();
  });
};
