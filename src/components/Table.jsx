import React, { useContext } from 'react';
import { AppContext } from './context';
import numeral from 'numeral';

const Table = () => {
    const { tableData, type } = useContext(AppContext);
    return (
        <table className='table'>
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
