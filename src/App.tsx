import { render } from "solid-js/web";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";
import { createSignal, Show } from "solid-js";

export type Book = {
  title: string;
  author: string;
};

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve Smith McConnell" },
  { title: "The Hobbit ", author: "J.R.R Tolkien" },
];

interface IBookshelfProps {
  name: string;
  location : string;
}

export function Bookshelf(props: IBookshelfProps) {
  
  const [books, setBooks] = createSignal(initialBooks);

  const[showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  return (
    <div class="container overflow-hidden">
      <h1>{props.name}'s at {props.location} Boookshelf</h1>
      <div class="row gx-5">
        <div class="col">
          <div class="p-3 border bg-light">
            <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={ toggleForm }>Add a book</button>}
      >
        <AddBook setBooks={setBooks} />
        <button onClick={ toggleForm }>Finished adding books</button>
      </Show>
          </div>
        </div>

      </div>
    </div>
  );
}

const root = document.getElementById("root");

if (root) {
  render(() => <Bookshelf name="Sunny" location="Trees" />, root);
}
