import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';

import { targetStatusOption, targetTypeOption, targetStatusColorOptions } from '../../constants';
import { getDateFormat, getStatusColor, getValueOption } from '../../utils/common';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';

export default function TargetTable(props) {
    const { targets, page, handlePageChange, isLoading } = props;
    const totalPage = targets ? targets.total_pages : 0;
    const perPage = targets ? targets.per_page : 0;
    const count = targets ? targets.count : 0;
    const hasTargets = targets && targets.results && !!targets.results.length;
    const history = useHistory();


    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasTargets ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No.</StyledTableCell>
                                <StyledTableCell align="center">Tutor name</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Type</StyledTableCell>
                                <StyledTableCell align="center">Target Count</StyledTableCell>
                                <StyledTableCell align="center">Cohort</StyledTableCell>
                                <StyledTableCell align="center">Start Date</StyledTableCell>
                                <StyledTableCell align="center">End Date</StyledTableCell>
                                <StyledTableCell align="center">Project Name</StyledTableCell>
                                <StyledTableCell align="center">GitHub Link</StyledTableCell>
                                <StyledTableCell align="center">Student Name</StyledTableCell>
                                <StyledTableCell align="center"> Note </StyledTableCell>
                                <StyledTableCell align="center"> Upadated By </StyledTableCell>
                                <StyledTableCell align="center"> created By </StyledTableCell>
                                <StyledTableCell align="center"> Date </StyledTableCell>
                                <StyledTableCell align="center"> Edit Target </StyledTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {targets.results.map((target, index) => (
                                <StyledTableRow key={target.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {perPage * (page - 1) + (1 + index)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{target.user_id.name}</StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ color: getStatusColor(targetStatusColorOptions, target.status) }}
                                    >
                                        {getValueOption(targetStatusOption, target.status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(targetTypeOption, target.type)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{target.target_number}</StyledTableCell>
                                    <StyledTableCell align="center">{target.cohort}</StyledTableCell>
                                    <StyledTableCell align="center">{target.project_start_date}</StyledTableCell>
                                    <StyledTableCell align="center">{target.project_due_date}</StyledTableCell>
                                    <StyledTableCell align="center">{target.project_name}</StyledTableCell>
                                    <StyledTableCell align="center">{target.project_github_link}</StyledTableCell>
                                    <StyledTableCell align="center">{target.project_student_name}</StyledTableCell>

                                    <StyledTableCell align="center">{target.note}</StyledTableCell>
                                    <StyledTableCell align="center">{target.updated_by && target.updated_by.name}</StyledTableCell>
                                    <StyledTableCell align="center">{target.created_by && target.created_by.name}</StyledTableCell>


                                    <StyledTableCell align="center">
                                        { getDateFormat(target.created_at)}
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() =>
                                                history.push(`/target/edit/${target.id}`, {
                                                    id: target.id
                                                })
                                            }
                                            text="Edit"
                                            variant="outlined"
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CustomPagination
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPage={totalPage}
                        count={count}
                        perPage={perPage}
                    />
                </TableContainer>
            ) : (
                <h3>NO DATA</h3>
            )}
        </>
    );
}
