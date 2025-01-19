import React, { useState, useEffect, useCallback, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import './flipbook.module.css'; // Import the CSS file

// Configure the PDF.js worker to use the local copy
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            <div>{props.children}</div>
            <p>Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return size;
};

const FlipBook = React.memo(({ book }) => {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, windowHeight] = useWindowSize();
    const flipbookRef = useRef(null);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

    const onDocumentLoadError = useCallback((error) => {
        console.error('Error loading PDF document:', error);
    }, []);



    const onPageFlip = useCallback((e) => {
        setCurrentPage(e.data);  // Update the current page number when flipped
    }, []);

    return (
        <div className="flipbook-container">
            <HTMLFlipBook
                className="flipbook"
                width={Math.min(windowWidth * 0.7, 800)}
                height={Math.min(windowHeight * 0.7, 600)}
                onFlip={onPageFlip}
                ref={flipbookRef}
                drawShadow={true}
                perspective={1500}
                startPage={currentPage - 1} // Start from the current page
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Pages key={index} number={index + 1}>
                        {Math.abs(currentPage - (index + 1)) <= 2 && (
                            <Document
                                file={book.file}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                            >
                                <Page pageNumber={index + 1} renderTextLayer={false} />
                            </Document>
                        )}
                    </Pages>
                ))}
            </HTMLFlipBook>
        </div>
    );
});

export default FlipBook;
