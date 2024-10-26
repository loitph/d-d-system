// create-component.js
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Component template
const componentTemplate = (componentName) => `import './${componentName}.css';

const ${componentName} = () => {
  return (
    <>
      <div>
        <p>${componentName} Component works!</p>
      </div>
    </>
  );
};

export default ${componentName};
`;

// CSS template
const cssTemplate = (componentName) => `/* Add styles for ${componentName} */
`;

// Create Component Directory and Files
const createComponent = (componentName) => {
  // [todo][minor] --> if path exist, return
  const dir = join(__dirname, '../../', 'src', 'components', componentName);

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  // Write component file
  writeFileSync(join(dir, `${componentName}.jsx`), componentTemplate(componentName));
  
  // Write CSS file
  writeFileSync(join(dir, `${componentName}.css`), cssTemplate(componentName));

  console.log(`${componentName} component created successfully.`);
};

// Grab component name from the command line
const componentName = process.argv[2];

// [todo][minor] --> maybe also define custom path

if (!componentName) {
  console.log('Please provide a component name.');
} else {
  createComponent(componentName);
}