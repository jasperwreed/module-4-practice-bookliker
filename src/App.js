import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image,
} from "semantic-ui-react";
import BookContainer from "./container/BookContainer";

const API = `http://localhost:3000/books`;
const defaultUser = { id: 1, username: "pouros" };

class App extends React.Component {
  state = {
    books: [],
    selectedBook: {},
  };

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((books) => {
        this.setState({
          books: books,
        });
      });
  }

  captureBook = (bookId) => {
    this.setState({
      selectedBook: this.state.books.find((book) => book.id === bookId),
    });
  };

  patchLike(book) {
    console.log(book)
    fetch(API + `/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
        'Accept': 'Application/json'
      },
      body: JSON.stringify({
        users: [...book.users, defaultUser]
      })
    })
    .then(res => res.json())
    .then(console.log)
  }

  renderDefault() {
    return (
      <>
        <Header>Book title</Header>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/image.png"
          size="small"
        />
        <p>Book description</p>
        <Button
          color="red"
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: "2,048",
          }}
        />
        <Header>Liked by</Header>
        <List>
          <List.Item icon="user" content="User name" />
        </List>
      </>
    );
  }

  renderSelected() {
    return (
      <>
        <Header>Book title</Header>
        <Image src={this.state.selectedBook.img_url} size="small" />
        <p>{this.state.selectedBook.description}</p>
        <Button
          color="red"
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: this.state.selectedBook.users.length,
          }}
          onClick={() => this.patchLike(this.state.selectedBook)}
        />
        <Header>Liked by</Header>
        <List>
          {this.state.selectedBook.users.map((element) => {
            return (
              <List.Item
                icon="user"
                key={element.description}
                content={element.username}
              />
            );
          })}
        </List>
      </>
    );
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            <BookContainer
              books={this.state.books}
              captureBook={this.captureBook}
            />
          </Menu>
          <Container text>
            {this.state.selectedBook.title
              ? this.renderSelected()
              : this.renderDefault()}
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
