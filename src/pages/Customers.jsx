import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, Selection, Edit, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Orders = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title='Customers'/>
      <GridComponent id='gridcomp' dataSource={customersData} allowPaging allowSorting toolbar={['Edit', 'Delete', 'Add']} editSettings={{ allowAdding: true, allowEditing: true, allowDeleting: true}}>
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, Selection, Edit, Toolbar]} />
      </GridComponent>
    </div>
  )
}

export default Orders