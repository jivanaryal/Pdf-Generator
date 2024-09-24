import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ProposalForm = () => {
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [objectives, setObjectives] = useState([{ header: '', content: '' }]);
  const [scope, setScope] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [conclusion, setConclusion] = useState('');

  const addObjective = () => {
    setObjectives([...objectives, { header: '', content: '' }]);
  };

  const handleObjectiveChange = (index, field, value) => {
    const newObjectives = [...objectives];
    newObjectives[index][field] = value;
    setObjectives(newObjectives);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set up custom margins and font sizes
    const margin = 20;
    const headerFontSize = 16;
    const contentFontSize = 13;
    const lineHeight = 8; // line height for better readability
    const maxHeight = doc.internal.pageSize.height - margin * 2; // Maximum height for content

    doc.setFontSize(headerFontSize);
    doc.text("Website Proposal", margin, margin);

    let currentY = margin + 10; // Start below the header

    const sections = [
      { label: "Title: ", content: title },
      { label: "Introduction: ", content: introduction },
      ...objectives.map((obj) => ({ label: obj.header + ": ", content: obj.content })),
      { label: "Scope: ", content: scope },
      { label: "Target Audience: ", content: targetAudience },
      { label: "Timeline: ", content: timeline },
      { label: "Budget: ", content: budget },
      { label: "Deliverables: ", content: deliverables },
      { label: "Conclusion: ", content: conclusion },
    ];

    doc.setFontSize(contentFontSize);

    sections.forEach((section) => {
      // Check if the current position exceeds the max height
      const sectionText = section.label + section.content;
      const textLines = doc.splitTextToSize(sectionText, doc.internal.pageSize.width - margin * 2); // Split text to fit page width

      textLines.forEach((line) => {
        if (currentY + lineHeight > maxHeight) {
          doc.addPage(); // Add a new page if content exceeds max height
          currentY = margin; // Reset Y position for the new page
        }
        doc.text(line, margin, currentY); // Print each line of the text
        currentY += lineHeight; // Move down for the next line
      });
    });

    // Save the PDF
    doc.save("proposal.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Create Your Proposal</h2>
      <form className="mt-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Introduction</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        
        <h3 className="mt-4">Objectives</h3>
        {objectives.map((obj, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Objective Header"
              value={obj.header}
              onChange={(e) => handleObjectiveChange(index, 'header', e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Objective Content"
              value={obj.content}
              onChange={(e) => handleObjectiveChange(index, 'content', e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addObjective}
          className="bg-green-500 text-white p-2 mt-2"
        >
          Add Another Objective
        </button>

        <div>
          <label>Scope</label>
          <textarea
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Target Audience</label>
          <textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Timeline</label>
          <textarea
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Budget</label>
          <textarea
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Deliverables</label>
          <textarea
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Conclusion</label>
          <textarea
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={generatePDF}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default ProposalForm;
