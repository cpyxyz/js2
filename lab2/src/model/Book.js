class Book {
  constructor(isbn, title, year, author) {
    this.isbn = isbn;
    this.title = title;
    this.year = year;
    this.author = author;
  }
  instances = {};

  static loadAll() {
    const books = window.localStorage.getItem('books');
    const parsedBooks = JSON.parse(books);
    this.instances = { ...parsedBooks };
    return parsedBooks;
  }

  static saveAll() {
    const books = JSON.stringify(this.instances);
    try {
      window.localStorage.setItem('books', books);
    } catch {
      throw Error('Error');
    }
  }

  static save() {
    const books = JSON.parse(window.localStorage.getItem('books'));
    const updatedBooks = JSON.stringify({ ...books, ...this.instances });
    try {
      window.localStorage.setItem('books', updatedBooks);
    } catch {
      throw Error('Error');
    }
  }

  static create({ isbn, title, year, author }) {
    const book = new Book(isbn, title, year, author);
    // const updatedInstances = { ...this.instances };
    // updatedInstances[`${isbn}`] = book;
    this.instances[`${isbn}`] = book;

    Book.save();
  }

  static update(isbn, newData) {
    const book = this.instances[isbn];
    book.title = newData.title;
    book.year = newData.year;
    book.author = newData.author;
    Book.save();
  }

  static delete(isbn) {
    const book = this.instances[isbn];
    if (book) {
      delete this.instances[book.isbn];
      Book.saveAll();
    } else {
      console.log('Book not found !');
    }
  }

  static clearData() {
    if (confirm('Do you want to clear?')) {
      window.localStorage.clear();
    }
  }
}
