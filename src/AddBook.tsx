import { createSignal, Setter, createResource, JSX, Show, For } from "solid-js";
import { Book } from "./App";
import { searchBooks } from "./searchBooks";

interface IAddBookProps {
  setBooks: Setter<Book[]>;
}

const emptyBook: Book = { title: "", author: "" };

export function AddBook(props: IAddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<Book[], string>(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
        </div>
        <button
          type="submit"
          onclick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback = {<>Searching.....</>}>
          <ul>
              <For each={data()}>
                {
                    (book) => (
                        <li>
                            {book.title} by {book.author}{" "}
                            <button
                            aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                            onClick={() => {
                              props.setBooks((books) => [...books, book]);
                            }}
                            >
                            Add    
                            </button>
                        </li>
                    )
                }
              </For>
          </ul>

      </Show>
    </>
  );
}
