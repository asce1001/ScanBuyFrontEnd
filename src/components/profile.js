import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Profile = () => {
    const [books, setBooks] = useState([]);
    const [searchText, setSeacrhText] = useState("");
    const [newISBN, setNewISBN] = useState();
    const [newTitle, setNewTitle] = useState("");
    const [newNumOfPages, setNewNumOfPages] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [temp, setTemp] = useState([]);
    
    // let url = `http://localhost:3000/book/findBook/isbn=`
    const onFormSubmit = () => {
        // e.preventDefault();
        // const isbnValue = e.target[0].value;
        // let url = `http://localhost:8080/book/allBooks`;
        let url = `http://localhost:8080/book/findBook/${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBooks([data])});
            console.log(books,'book')
        };

    const getAllBooks = () => {
        //const isbnValue = e.target[0].value;
        let url = `http://localhost:8080/book/allBooks`;
        // let url = `http://localhost:8080/book/findBook/232`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setBooks(data);
        });
        // console.log(response, 'resss');
    };

    const deleteBook = ({isbn}) => {
        //const isbnValue = e.target[0].value;
        // console.log(book);
        // book.ISBN = book.isbn;
        let url = `http://localhost:8080/book/deletebook`;
        // let url = `http://localhost:8080/book/findBook/232`;
        fetch(url, 
            {method: 'POST', 
            // data : isbn, 
            mode: 'cors', 
            body: isbn,
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            res.json()
            getAllBooks()
        })
        // .then(data => {
        //     setBooks(data);
        // });
        // console.log(response, 'resss');
    };

    const createNew = (t) => {
        let book={}
        book.isbn = newISBN;
        book.title = newTitle;
        book.numOfPages = parseInt(newNumOfPages)
        book.author = newAuthor
        let url=''
        if(t==1){
             url = `http://localhost:8080/book/updatebook`;

        }
        else{
             url = `http://localhost:8080/book/addbook`;
        }
        fetch(url, 
            {method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(book),
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            console.log(res);
            res.json()
            getAllBooks()
        })
        // .then(data => {
        //     setBooks(data);
        // });
        // console.log(response, 'resss');
    };

    const edit=(book)=>{
        setNewISBN(book.isbn)
        setNewAuthor(book.author)
        setNewNumOfPages(book.numOfPages)
        setNewTitle(book.title)
        // createNew(1)
        console.log(newAuthor, newISBN, 'updated values');
    }


    const updateBook = (book) => {
        // let book={}
        // book.ISBN = parseInt(newISBN)
        // book.title = newTitle
        // book.numOfPages = parseInt(newNumOfPages)
        // book.author = newAuthor
        let url = `http://localhost:8080/book/updatebook`;
        fetch(url, 
            {method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(book),
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            console.log(res);
            res.json()
            getAllBooks()
        })
        // .then(data => {
        //     setBooks(data);
        // });
        // console.log(response, 'resss');
    };


    useEffect(() => {
        getAllBooks();
        setTemp([{"hh":"hh"}])
        console.log(books, 'books')
    }, []);

    

    const [isbn, setIsbn] = useState();
    return (
      <div>
        <div className="search-container">
            <input type="number"  placeholder="Enter ISBN" onChange={(e) => setSeacrhText(e.target.value)}/>
            <button onClick={onFormSubmit}>Search</button>
        </div>
        

        <div className="wrapper">
            <div className="list-view flex">
                <table>
                    <tr>
                        <td>ISBN</td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Number Of Pages</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    <tbody>
                    {
                        
                        books.map((book, index) => {
                            return(
                            <tr key={index}>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.numOfPages}</td>
                                <td>
                                <button onClick={(e) => edit(book)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={(e) => deleteBook(book)}>Delete</button>

                                </td>
                            </tr>)
                        })
                    }    
                    </tbody>   
                </table>
            </div>
            <div className="edit-wrapper flex">
                
                <div className="edit-container">
                <h2>Create/Update Record</h2>
                <div className="edit-cell">Title : 
                    <input name='Title' placeholder="Enter Title" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                </div>
                <div className="edit-cell">Number of Pages : 
                    <input name = 'NumOfPages'type="number" placeholder="Enter page numbers" value={newNumOfPages} onChange={(e) => setNewNumOfPages(e.target.value)}/>
                </div>
                <div className="edit-cell">Author : 
                    <input name = 'Author' type="text" value={newAuthor} placeholder="Enter Author" onChange={(e) => setNewAuthor(e.target.value)}/>
                </div>
                <div className="button-container">
                    <div className="edit-cell">
                        <button onClick={(e) => createNew(0)}>Add</button>
                    </div>
                    <div className="edit-cell">
                        <button onClick={(e) =>createNew(1)}>Update</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
      </div>
    );
  };
  
  export default Profile;
  