import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FiEdit2 } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const List = ({ lists, handleDelete, handleEdit, clearAll, handleLine }) => {
  return (
    <Wrapper>
      {lists.map((list) => {
        const { id, name, isComplete } = list
        return (
          <article key={id} className='list-container'>
            <input
              type='checkbox'
              onChange={() => handleLine(id)}
              checked={isComplete}
            />
            <p
              style={{
                textDecoration: `${
                  isComplete === true ? 'line-through' : 'none'
                }`,
              }}
            >
              {name}
            </p>

            <div className='btn-container'>
              <span className='edit-btn'>
                {' '}
                <FiEdit2
                  onClick={() => handleEdit(id)}
                  style={{ marginRight: '1rem' }}
                />
              </span>

              <span className='del-btn'>
                {' '}
                <AiOutlineDelete onClick={() => handleDelete(id)} />
              </span>
            </div>
          </article>
        )
      })}
      <div className='text-center'>
        {lists.length >= 1 && (
          <Button
            variant='outline-secondary'
            className='mt-3'
            size='sm'
            onClick={clearAll}
          >
            Clear List
          </Button>
        )}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  margin-top: 1rem;
  .list-container {
    display: flex;
    justify-content: space-between;
  }
  .del-btn {
    color: #e94b3cff;
  }
  .edit-btn {
    color: #2bae66ff;
  }
`
export default List
