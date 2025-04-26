export const errorHandler = (res, error) => {
  console.error('Error:', error);
  
  if (error.code === 'P2002') {
    return res.status(409).json({ 
      message: 'A resource with that identifier already exists.' 
    });
  }
  
  if (error.code === 'P2025') {
    return res.status(404).json({ 
      message: 'Record not found.' 
    });
  }
  
  return res.status(500).json({ 
    message: 'Internal server error.', 
    error: process.env.NODE_ENV === 'production' ? undefined : error.message
  });
};
