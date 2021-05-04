import React, { useContext } from 'react';
import { AppContext } from './context';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app__table: {
        margin: '1rem 0',
        display: 'block',
        height: '400px',
        overflowY: 'scroll',
        borderCollapse: 'collapse',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '& tbody': {
            display: 'block',
            width: '100%',
        },
        '& tr': {
            justifySelf: 'stretch',
            display: 'flex',
            justifyContent: 'space-between',
        },
        '& td': {
            padding: '0.5rem',
        },
        '& tr:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
    },
}));

const Table = () => {
    const { tableData, type } = useContext(AppContext);

    const classes = useStyles();

    return (
        <table className={classes.app__table}>
            <tbody>
                {tableData.map(
                    ({ country, cases, recovered, deaths }, index) => {
                        let data;
                        type === 'cases'
                            ? (data = cases)
                            : type === 'recovered'
                            ? (data = recovered)
                            : (data = deaths);
                        return (
                            <tr key={index}>
                                <td>{country}</td>
                                <td>
                                    <strong>
                                        {numeral(data).format('0,0')}
                                    </strong>
                                </td>
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    );
};

export default Table;
