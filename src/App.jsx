import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главный Layout объединяет шапку и футер */}
        <Route path="/" element={<Layout />}>
          {/* Вместо отдельного файла Home выводим контент прямо здесь */}
          <Route 
            index 
            element={
              <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '50vh' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Добро пожаловать в Shoppe!</h1>
                <p style={{ color: '#707070' }}>Шапка и футер успешно подключены через макет.</p>
              </div>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}