import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'
import List from './List'

const App = () => {
  const getLocalStorage = () => {
    let list = localStorage.getItem('list')

    if (list) {
      return (list = JSON.parse(localStorage.getItem('list')))
    } else {
      return []
    }
  }

  const [lists, setLists] = useState(getLocalStorage())
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      toast.error('Empty todos')
    } else if (isEditing && name) {
      setLists(
        lists.map((list) => {
          if (list.id === editId) {
            return { ...list, name }
          }
          return list
        })
      )
      setEditId(null)
      setIsEditing(false)
      setName('')
      toast.success('Todos Updated')
    } else {
      const todoList = {
        id: new Date().getTime().toString(),
        name,
        isComplete: false,
      }

      setLists((old) => {
        return [...old, todoList]
      })
      setName('')
      toast.success('Good Job! Todos Created')
    }
  }

  const clearAll = () => {
    setLists([])
    toast.error('All todos deleted.')
  }

  const handleEdit = (id) => {
    const editList = lists.find((li) => li.id === id)
    setName(editList.name)
    setIsEditing(true)
    setEditId(id)
  }

  const handleDelete = (id) => {
    const filteredList = lists.filter((li) => li.id !== id)
    setLists(filteredList)
    toast.error('Todos Deleted.')
  }

  const handleLine = (id) => {
    setLists(
      lists.map((item) => {
        if (item.id === id) {
          return { ...item, isComplete: !item.isComplete }
        }

        return item
      })
    )
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(lists))
  }, [lists])

  const completeList = lists.filter((item) => {
    return item.isComplete !== false
  })

  return (
    <Wrapper>
      <Toaster />
      <Card>
        <Card.Header as='h5' className='d-flex justify-content-between'>
          ToDo Lists
          <div>Total List : {lists.length}</div>
          <div>Completed List : {completeList.length}</div>
        </Card.Header>

        <Card.Body>
          <Form className='d-flex'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter todos'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type='submit'
              variant='outline-primary'
              onClick={handleSubmit}
            >
              {isEditing ? 'Edit' : 'Submit'}
            </Button>
          </Form>
          <List
            lists={lists}
            setLists={setLists}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleLine={handleLine}
            clearAll={clearAll}
          />
        </Card.Body>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (min-width: 992px) {
    .card {
      width: 50vw;
    }
  }
`

export default App
