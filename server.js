const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
// const ejsEngine = require('express-ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.engine('ejs', ejsEngine);
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Route for fetching all PDF data
// app.post('/show_all', (req, res) => {
//     // Mock data - replace this with actual data fetching logic
//     const pdfData = [
//         { id: '1', name: 'PDF 1' },
//         { id: '2', name: 'PDF 2' },
//         // Add more PDF objects
//     ];
//     res.json(pdfData); // Send the mock data as response
// });

app.get('/', async (req, res) => {
    try {
        const pdfDataResponse = await fetch('https://c920-18-118-218-235.ngrok-free.app/show_all', {
            method: 'POST',
        });

        if (!pdfDataResponse.ok) {
            throw new Error('Failed to fetch PDF data');
        }

        const pdfData = await pdfDataResponse.json();

        res.render('index', { pdfData }); // Render the 'index' view and pass the pdfData to it
    } catch (error) {
        console.error('Error rendering PDF data:', error);
        res.status(500).send('Server error');
    }
});


// Route for fetching a specific PDF by ID (Used for download links)
app.get('/:pdf_id.pdf', async (req, res) => {
    const pdf_id = req.params.pdf_id;
    // Instead of sending a real PDF file, we send back a JSON object for demonstration
    // You should replace this with logic to retrieve and send the actual PDF file
    // res.json({ id: pdfId, message: `This would be PDF ${pdfId}` });
    try {
        console.log(pdf_id);
        // const pdfDataResponse = await fetch('https://c920-18-118-218-235.ngrok-free.app/show_all/'+pdf_id, {
        const pdfDataResponse = await fetch('http://127.0.0.1:5000/show_all/'+pdf_id, {
            method: 'POST',
        });

        // console.log(pdfDataResponse)
        if (!pdfDataResponse.ok) {
            throw new Error('Failed to fetch PDF data');
        }

        const pdfData = await pdfDataResponse.json();
        console.log(pdfData);
        res.render('index', { pdfData }); // Render the 'index' view and pass the pdfData to it
    } catch (error) {
        console.error('Error rendering PDF data:', error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));