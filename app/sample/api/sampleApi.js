
import naraFetch from '../../common/nara/naraFetch';


const content = {
  title: 'Sample Page',
  text: 'This is a react sample page.',
};

const api = {
  //
  findSampleContent: (pageName) =>
    Promise.resolve({ title: `${pageName} ${content.title}`, text: `${content.text} - ${pageName}` }),
};

export default api;
