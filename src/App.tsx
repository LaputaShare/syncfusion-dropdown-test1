import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { JSX, useState } from 'react';
import {
  FilteringEventArgs,
  DropDownListComponent,
} from '@syncfusion/ej2-react-dropdowns';
import { Query, Predicate } from '@syncfusion/ej2-data';

import './App.css';

function App() {
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const openDialog = () => {
    console.log(`Open dialog trigger`);
    setOpenDialog(true);
  };
  const closeDialog = () => {
    console.log(`Close dialog trigger`);
    setOpenDialog(false);
  };
  const BookData = [
    {
      id: 1,
      bookNumber: 'B01',
      description: 'Book One',
    },
    {
      id: 2,
      bookNumber: 'B02',
      description: 'Book Two',
    },
    {
      id: 3,
      bookNumber: 'B03',
      description: 'Book Three',
    },
  ];

  const headerElementTemplate = (data: any): JSX.Element => {
    return (
      <span className="head">
        <span className="bookNumber">Code</span>
        <span className="bookName">Name</span>
      </span>
    );
  };

  const itemElementTemplate = (data: any): JSX.Element => {
    return (
      <span className="item">
        <span className="bookNumber">{data.bookNumber}</span>
        <span className="bookName">{data.description}</span>
      </span>
    );
  };

  const onDropdownFiltering = (e: FilteringEventArgs) => {
    if (!BookData || BookData == null) {
      return;
    }
    if (e.text === '') {
      e.updateData(BookData);
    } else {
      let query: Query = new Query();
      const predicate = new Predicate(
        'bookNumber',
        'contains',
        e.text,
        true
      ).or('description', 'contains', e.text, true);
      query = e.text !== '' ? query.where(predicate) : query;
      e.updateData(BookData!, query);
    }
  };

  return (
    <div>
      <Dialog open={isOpenDialog} fullWidth maxWidth="sm">
        <DialogTitle textAlign="left">Simple Dialog</DialogTitle>
        <DialogContent>
          <DropDownListComponent
            id="bookId"
            name="bookId"
            floatLabelType="Always"
            headerTemplate={headerElementTemplate}
            dataSource={BookData}
            itemTemplate={itemElementTemplate}
            fields={{ text: 'bookNumber', value: 'id' }}
            placeholder="Book Number (Can't filter)"
            filtering={onDropdownFiltering}
            allowFiltering={true}
            showClearButton={true}
          />
          <button onClick={closeDialog} style={{ marginTop: 30 }}>
            Close me
          </button>
        </DialogContent>
      </Dialog>
      <h1 className="title">Hello!</h1>
      <div style={{ width: 300 }}>
        <DropDownListComponent
          id="bookId"
          name="bookId"
          floatLabelType="Always"
          headerTemplate={headerElementTemplate}
          dataSource={BookData}
          itemTemplate={itemElementTemplate}
          fields={{ text: 'bookNumber', value: 'id' }}
          placeholder="Book Number (can filter)"
          filtering={onDropdownFiltering}
          allowFiltering={true}
          showClearButton={true}
        />
      </div>

      <button onClick={openDialog} style={{ marginTop: 30 }}>
        Click me
      </button>
    </div>
  );
}

export default App;
