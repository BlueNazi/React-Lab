import React from 'react';

const CertificateList = ({ certificates }) => {
    return (
        <div>
            <h3>مدارک زبان:</h3>
            <ul>
                {certificates.map((certificate, index) => (
                    <li key={index}>
                        {certificate.type}: {certificate.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificateList;