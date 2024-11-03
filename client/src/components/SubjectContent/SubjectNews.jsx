import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublications, deletePublication, createPublication } from '../../redux/actions';
import ModalCreatePublication from './ModalCreatePublication';
import Button from '@mui/material/Button';
import '../DetailSubjects.scss';

const SubjectNews = () => {
    const dispatch = useDispatch();
    const publications = useSelector(state => state.publications);
    const currentUnit = useSelector(state => state.detailCurriculumUnit);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (currentUnit.id) {
            dispatch(getPublications(currentUnit.id));
        }
    }, [dispatch, currentUnit.id]);

    const handleCreatePublication = (publicationData) => {
        dispatch(createPublication({
            ...publicationData,
            CurriculumUnitId: currentUnit.id
        }));
    };
        const handleDelete = (id) => {
            dispatch(deletePublication(id));
        };
    return (
        <div className="CurrUnitContent">
            <div className='CurrUnitViewerHeader HeaderEdits'>
                <h2><b>NOVEDADES</b></h2>
                <button onClick={() => setIsModalOpen(true)} className="create-button">
                    Nueva Publicación
                </button>
            </div>
            <div className="publications-list">
                {publications.map(pub => (
                    <div key={pub.id} className="publication-item">
                        <div className='publication-title'><h3>{pub.title}</h3>
                        <p className="publication-autor">
                            {pub.User?.name} {pub.User?.lastName}
                        </p>
                        <label className='publication-autor'>{pub.createdAt.split('T')[0]}</label>
                        </div>
                        <p>{pub.description}</p>
                        <button onClick={() => handleDelete(pub.id)} className="delete-button">
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
            <ModalCreatePublication
                IsOpen={isModalOpen}
                SetIsOpen={setIsModalOpen}
                onCreatePublication={handleCreatePublication}
                currentUnitId={currentUnit.id}
            />
        </div>
    );
};

export default SubjectNews;