import { Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Grid, Stack } from '@mui/material';

import CustomButton from '../../components/form/CustomButton';
import { useEffect } from 'react';
import communicationsRequest from '../../requests/communications-request';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import Score from './Score';
import CustomTextField from '../../components/form/CustomTextField';
import { titleCase } from '../../utils/common';

const AddUpdate = (toggleDrawer, open) => {
    const history = useHistory();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);

    const [communication, setCommunication] = useState({
        communication_scores: [],
    });

    useEffect(() => {
        if (id) {
            communicationsRequest.find(id).then(res => {
                setCommunication(prev => ({
                    ...prev,
                    ...res
                }))
                setIsLoading(false);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onScoreChange = (id, name, value) => {
        let newScore = communication.communication_scores;
        const foundIndex = newScore.findIndex(item => item.id === id);
        if (foundIndex !== -1)
            newScore[foundIndex][name] = value;

        setCommunication(prev => ({
            ...prev,
            communication_scores: newScore
        }))
    }

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            communicationsRequest
                .update(id, {
                    ...communication
                })
                .then(() => history.goBack())
                .catch(err => {
                    setIsLoading(false);
                    console.log('err', err);
                });

        }
    };

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} an Score
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomTextField label="Engineer Name" value={communication.task ? communication.task.user_id_assigned.name : ''} disabled />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField label="Student Name" value={communication.task ? communication.task.session_student_name : ''} disabled />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField label="Student Support Type" value={communication.task ? titleCase(communication.task.type) : ''} disabled />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField label="Status" value={communication.task ? titleCase(communication.task.status) : ''} disabled />
                </Grid>
            </Grid>
            {communication.communication_scores.length ?
                <Score scores={communication.communication_scores} onScoreChange={onScoreChange} />
                :
                null
            }

            <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'Add'}
                />
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack>
        </>
    );
};
export default AddUpdate;
