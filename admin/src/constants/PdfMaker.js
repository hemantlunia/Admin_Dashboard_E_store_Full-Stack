import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

 const csvtoday = new Date();
   const csvformattedDate = csvtoday.toLocaleDateString("en-GB");

  const handlePdfMaker = (items) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    doc.setFontSize(20);
    doc.setTextColor("#333");
    doc.text("Invoice Slip", pageWidth / 2, 40, { align: "center" });
  
    const tableColumn = [
      "Sr.No",
      "Invoice No",
      "Date",
      "Item Code",
      "Item Name",
      "Company Name",
      "HSN",
      "Rate",
      "Unit",
      "Qty",
      "Discount",
      "GST",
      "CGST",
      "SGST",
      "Total",
    ];
  
    const tableRows = items.map((item, index) => [
      index + 1,
          item.invoiceNumber,
          csvformattedDate,
          item.itemCode,
          item.name,
          item.companyName,
          item.hsnCode,
          item.rate,
          item.unit,
          item.quantity,
          item.discount,
          item.gst,
          item.cgst,
          item.sgst,
          item.totalAmount,
    ]);
  
    autoTable(doc, {
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 9,
        cellPadding: 5,
        overflow: "linebreak",
        valign: "middle",
        textColor: "#000",
      },
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
        fontSize: 10,
        halign: "start",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 65 },
        2: { cellWidth: 55 },
        3: { cellWidth: 60 },
        4: { cellWidth: 90 },
        5: { cellWidth: 80 },
        6: { cellWidth: 50 },
        7: { cellWidth: 50 },
        8: { cellWidth: 50 },
        9: { cellWidth: 40 },
        10: { cellWidth: 55 },
        11: { cellWidth: 45 },
        12: { cellWidth: 45 },
        13: { cellWidth: 45 },
        14: { cellWidth: 60 },
      },
      margin: { top: 60, left: 30, right: 30 },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Hemant", 30, 20);
        doc.text("pdf", 30, 34);
  
        const pageCount = doc.internal.getNumberOfPages();
        const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
        doc.setTextColor(150);
        doc.text(
          `Page ${pageNum} of ${pageCount}`,
          pageWidth - 80,
          pageHeight - 20
        );
      },
    });
    doc.save("invoice-slip.pdf");
  }

  export default handlePdfMaker;