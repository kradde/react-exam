export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const formatContent = (text) => {
    return text.length > 70 ? text.substring(0, 70) : text;
};
