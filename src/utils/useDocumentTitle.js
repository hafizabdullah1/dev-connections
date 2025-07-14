import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - DevConnections` : 'DevConnections';
  }, [title]);
}

export default useDocumentTitle; 