import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import '../DetailSubjects.scss'

const SubjectContentHeader = ({currentRoute}) => {

    

    return (
        <div className="SubjectContentHeader ">
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center','& > *': {m: 1,},}}>
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Link to={currentRoute+'/news'}><Button >NOVEDADES</Button></Link>
                    <Link to={currentRoute+'/work'}><Button >TRABAJOS</Button></Link>
                    <Link to={currentRoute+'/members'}><Button >INTEGRANTES</Button></Link>
                </ButtonGroup>
            </Box>
        </div>
    );
};

export default SubjectContentHeader;