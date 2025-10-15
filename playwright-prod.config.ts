import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();

export default defineConfig<TestOptions>({
  
  use: {
    
     globalsQaURL : 'https://www.globalsqa.com/demo-site/draganddrop/',
     baseURL : 'http://localhost:63810',
  },
    

  projects: [
    {
      name: 'chromium',
     
    }
]

});
