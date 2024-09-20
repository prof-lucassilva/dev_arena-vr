export const getLocalStorageData = () => {
    const objetivos = JSON.parse(localStorage.getItem('objetivos') || '[]');
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    const boosts = JSON.parse(localStorage.getItem('boosts') || '[]');
    return { objetivos, cards, boosts };
  };