// Create global object for modal framework
var modalFw = {};

(function() {
    // Create and append modal container to body if it doesn't exist
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modalFwContainer';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);

    // Add styles to document
    const styles = document.createElement('style');
    styles.textContent = `
        #modalFwContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            position: relative;
            width: 400px;
            max-width: 90%;
        }

        .x {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            color: #333;
        }

        .message {
            margin: 20px 0;
            font-size: 18px;
            color: #333;
            text-align: center;
        }

        .buttonArea {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }

        .buttonArea input {
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            color: #fff;
            background-color: #007bff;
            transition: background-color 0.3s ease;
        }

        .buttonArea input:hover {
            background-color: #0056b3;
        }
    `;
    document.head.appendChild(styles);

    // Global event listener cleanup function
    let escapeListener = null;
    let clickListener = null;
    let currentCallback = null;  // Store the current callback function

    function removeEventListeners() {
        if (escapeListener) {
            document.removeEventListener('keydown', escapeListener);
            escapeListener = null;
        }
        if (clickListener) {
            modalContainer.removeEventListener('click', clickListener);
            clickListener = null;
        }
        currentCallback = null;
    }

    function closeModal() {
        modalContainer.style.display = 'none';
        modalContainer.innerHTML = '';
        removeEventListeners();
    }

    function handleConfirm() {
        if (currentCallback) {
            try {
                currentCallback();
            } catch (e) {
                console.error('Error in confirm callback:', e);
            }
        }
        closeModal();
    }

    function showModal(contentHTML) {
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="x" onclick="modalFw.close()">&times;</span>
                ${contentHTML}
            </div>
        `;
        modalContainer.style.display = 'flex';

        // Close modal when clicking outside
        clickListener = (e) => {
            if (e.target === modalContainer) {
                closeModal();
            }
        };
        modalContainer.addEventListener('click', clickListener);

        // Add escape key listener
        escapeListener = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keydown', escapeListener);
    }

    // Public methods
    modalFw.close = closeModal;
    modalFw.handleConfirm = handleConfirm;  // Expose handleConfirm for the OK button

    modalFw.alert = function(message) {
        console.log("function modalFw.alert was called with message " + message);
        const alertHtml = `
            <div class="message">${message}</div>
            <div class="buttonArea">
                <input type="button" value="OK" onclick="modalFw.close();" />
            </div>
        `;
        showModal(alertHtml);
    };

    modalFw.snackBar = function(message, millisecs) {
        console.log("function modalFw.snackBar was called with message " + message);
        showModal(`<div class="message">${message}</div>`);
        setTimeout(closeModal, millisecs);
    };

    modalFw.confirm = function(message, okFunction) {
        console.log("function modalFw.confirm was called with message " + message);
        currentCallback = okFunction;  // Store the callback
        const confirmHtml = `
            <div class="message">${message}</div>
            <div class="buttonArea">
                <input type="button" value="OK" onclick="modalFw.handleConfirm()" />
                <input type="button" value="Cancel" onclick="modalFw.close()" />
            </div>
        `;
        showModal(confirmHtml);
    };
}());