import React from 'react';
import SideBar from '../SideBar/SideBar';
import './NotebookList.css'

function NotebookList(){

    return (
        <>

        <div className='note-book-list'>
            <SideBar />
            <div className='notebook-list-page'>
                <div className='notebook-list-top'>
                    Notebooks
                </div>
                <div>
                    <div>3 notebooks</div>
                    <div>New Notebook</div>
                </div>

                <div>
                    
                </div>

            </div>

        </div>
        
        </>
    )
}


export default NotebookList;