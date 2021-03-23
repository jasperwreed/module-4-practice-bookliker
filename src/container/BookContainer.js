import React from 'react'
import Book from '../component/Book'

export default class BookContainer extends React.Component {

  render() {
    return (
      <>
       {this.props.books.map(book => <Book book={book} key={book.id} captureBook={this.props.captureBook} />)}
      </>
    )
  }
}