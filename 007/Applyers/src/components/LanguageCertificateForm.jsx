import React, { useState } from 'react';
import CertificateForm from './CertificateForm';
import CertificateList from './CertificateList';

const LanguageCertificateForm = () => {
    const [certificates, setCertificates] = useState([]);

    const handleAddCertificate = (newCertificate) => {
        setCertificates([...certificates, newCertificate]);
    };

    return (
        <div>
            <h2> مدارک زبان</h2>
            <CertificateForm onAddCertificate={handleAddCertificate} />
            <CertificateList certificates={certificates} />
        </div>
    );
};

export default LanguageCertificateForm;