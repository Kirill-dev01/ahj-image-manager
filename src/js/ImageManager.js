export default class ImageManager {
    constructor() {
        this.dropZone = document.getElementById('drop-zone');
        this.fileInput = document.getElementById('file-input');
        this.previewContainer = document.getElementById('preview-container');
        this.init();
    }

    init() {
        // 1. Обработка клика: передаем клик с красивой зоны на скрытый инпут
        this.dropZone.addEventListener('click', () => {
            this.fileInput.click();
        });

        // 2. Файлы выбраны через стандартное окно ОС
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);

            // очищаем значение инпута. 
            // Иначе браузер подумает, что файл не изменился, и не даст выбрать его второй раз подряд
            this.fileInput.value = '';
        });

        // 3. Native Drag and Drop
        // Отменяем поведение по умолчанию (открытие файла в новой вкладке)
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('dragover'); // Подсвечиваем зону
        });

        this.dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover'); // Убираем подсветку
        });

        // Событие "Бросили файл"
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');

            // Забираем файлы из события Drop
            this.handleFiles(e.dataTransfer.files);
        });
    }

    // Общая функция отрисовки для обоих методов
    handleFiles(files) {
        Array.from(files).forEach(file => {
            // Пропускаем, если это не картинка
            if (!file.type.startsWith('image/')) return;

            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview';

            const img = document.createElement('img');
            // Создаем временную ссылку на файл в памяти браузера
            img.src = URL.createObjectURL(file);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '✖';

            // Удаление картинки
            deleteBtn.addEventListener('click', () => {
                previewItem.remove();
                URL.revokeObjectURL(img.src); // Очищаем память, удаляя временную ссылку
            });

            previewItem.append(img);
            previewItem.append(deleteBtn);
            this.previewContainer.append(previewItem);
        });
    }
}
