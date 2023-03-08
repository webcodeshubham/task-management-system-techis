import { Grid } from '@mui/material';
import React from 'react';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextField from '../../components/form/CustomTextField';
import { errorScoreOptions, scoreOption } from '../../constants';
import PropTypes from 'prop-types';
import { titleCase } from '../../utils/common';

function Score(props) {
    const {scores, onScoreChange} = props;

    return (
        <>
            {scores.groupBy('communication_field.communication_type').map((score, key) => {
                return (
                    <>
                        <Grid container spacing={2} marginTop={2} key={`type-${key}`}>
                            <Grid item xs={4}>
                                <strong>{titleCase(score[0].communication_field.communication_type)}</strong>
                            </Grid>
                        </Grid>

                        {score.map(field => {
                            return (
                                <Grid container spacing={2} marginTop={2} marginBottom={2} key={`field-${field.communication_field.id}`}>
                                    <Grid item xs={5}>
                                        <CustomTextField
                                            name="field"
                                            value={field.communication_field.attribute_of_communication}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        // disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <CustomSelect
                                            label="Score"
                                            name="score"
                                            selectedValue={+field.score}
                                            onChange={(e) => onScoreChange(field.id, 'score', e.target.value)}
                                            options={score[0].communication_field.communication_type === 'error' ? errorScoreOptions : scoreOption}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <CustomTextField
                                            label="Comment"
                                            name="comment"
                                            value={field.comment || ''}
                                            onChange={(e) => onScoreChange(field.id, 'comment', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </>
                );
            })}

        </>
    );
}

Score.propTypes = {
    scores: PropTypes.array
};

export default Score;
