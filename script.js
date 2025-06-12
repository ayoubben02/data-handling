const dataList = []; // This is your list (array)

    document.getElementById('dataForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      const entry = { name, email };
      dataList.push(entry); // Add to list

      // Show on page
      const li = document.createElement('li');
      li.textContent = `${name} - ${email}`;
      document.getElementById('dataList').appendChild(li);

      // Clear inputs
      document.getElementById('dataForm').reset();
    });

    // Download list as JSON file
    document.getElementById('downloadBtn').addEventListener('click', function() {
      const blob = new Blob([JSON.stringify(dataList, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'all_data.json';
      link.click();
    });

    document.getElementById('pdfBtn').addEventListener('click', function () {
      const doc = new jsPDF();
      doc.setFontSize(14);
  
      dataList.forEach((item, index) => {
        doc.text(`Entry ${index + 1}:`, 10, 20 + index * 20);
        doc.text(`Name: ${item.name}`, 10, 30 + index * 20);
        doc.text(`Email: ${item.email}`, 10, 40 + index * 20);
      });
  
      doc.save("data.pdf");
    });