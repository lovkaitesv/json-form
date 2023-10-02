# Dynamic Form App

Test task with dynamic form rendered from a json file uploaded.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/lovkaitesv/json-form.git
   
2. Navigate to the project folder:

   ```bash
   cd json-form
   
3. Install dependencies:

   ```bash
   npm install
   
4. Start the development server:

   ```bash
   npm run dev
   
5. Open your browser and visit http://localhost:5173 to view the app.

## Json type declaration

In order to use the app correctly, prepare json file with a data array using the following template:

   ```bash
[{
devault_value?: string | number | boolean;
value?: string | number | boolean;
validation?: string (regex);
min_value?: number;
max_value?: number;
options?: string[] | number[];
type: 'text' | 'longtext' | 'dropdown' | 'number'
},…]