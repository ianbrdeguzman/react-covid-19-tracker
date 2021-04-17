import React, { useContext } from 'react';
import { AppContext } from './context';
import numeral from 'numeral';

const Table = () => {
    const { tableData } = useContext(AppContext);

    return (
        <table className='table'>
            <tbody>
                {tableData.map(({ country, cases }, index) => {
                    return (
                        <tr key={index}>
                            <td>{country}</td>
                            <td>
                                <strong>{numeral(cases).format('0,0')}</strong>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
