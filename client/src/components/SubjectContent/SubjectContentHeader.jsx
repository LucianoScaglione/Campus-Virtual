import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { detailCurriculumUnit, emptyState } from "../../redux/actions";

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import '../DetailSubjects.scss'

const SubjectContentHeader = ({setCurrentArea}) => {

    return (
        <div className="SubjectContentHeader ">
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center','& > *': {m: 1,},}}>
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button onClick={() => setCurrentArea(1)}>NOVEDADES</Button>
                    <Button onClick={() => setCurrentArea(2)}>TRABAJOS</Button>
                    <Button onClick={() => setCurrentArea(3)}>INTEGRANTES</Button>
                </ButtonGroup>
            </Box>
        </div>
    );
};

export default SubjectContentHeader;