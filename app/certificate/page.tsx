"use client";

import { jsPDF } from "jspdf";

export default function CertificatePage() {
  const generateCertificate = () => {
    const studentName =
      prompt("Enter Student Name");

    const courseName =
      prompt("Enter Course Name");

    if (!studentName || !courseName)
      return;

    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text(
      "Certificate of Completion",
      40,
      40
    );

    doc.setFontSize(16);

    doc.text(
      `This certifies that`,
      70,
      80
    );

    doc.setFontSize(22);

    doc.text(
      studentName,
      70,
      100
    );

    doc.setFontSize(16);

    doc.text(
      `has successfully completed`,
      55,
      130
    );

    doc.setFontSize(20);

    doc.text(
      courseName,
      60,
      150
    );

    doc.save(
      `${studentName}-certificate.pdf`
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-white/10 p-10 rounded-3xl">
        <h1 className="text-4xl font-bold mb-6">
          Certificate Generator
        </h1>

        <button
          onClick={generateCertificate}
          className="bg-green-500 px-6 py-3 rounded-xl font-bold"
        >
          Generate Certificate
        </button>
      </div>
    </div>
  );
}