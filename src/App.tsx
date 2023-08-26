import LinearProgress from '@mui/material/LinearProgress'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppDispatch } from './common/hooks/useAppDispatch.ts'
import { Header, Loading } from './components/ui'
import { authActions } from './service/auth/authSlice.ts'
import { useMeQuery } from './service/auth/serverceAuth.ts'
import { RootState } from './service/store.ts'

export function App() {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  const navigate = useNavigate()

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const isInitialized = useSelector((state: RootState) => state.auth.isInitialized)

  if (data) {
    dispatch(authActions.setValueIsLoggedIn({ value: true }))
  }
  if (isLoading) {
    dispatch(authActions.setValueIsLoggedIn({ value: true }))
  }
  const handlerOnClick = () => {
    navigate('/register')
  }

  return (
    <div>
      <Header handlerOnClick={handlerOnClick} isLoggedIn={isLoggedIn} />
      {isLoading && <LinearProgress color="inherit" />}
      {!isInitialized ? <Loading /> : <Outlet />}
    </div>
  )
}

/*

return (
    <div>
        <Header handlerOnClick={handlerOnClick} isLoggedIn={isLoggedIn} />
        {isLoading && <LinearProgress color="inherit" />}
        <div>
            <div>
                <NavLink to={'/login'}>нажми и перейди на login</NavLink>
            </div>
            <div>
                <NavLink to={'/register'}>нажми и перейди на register</NavLink>
            </div>
            <div>
                <NavLink to={'/decks'}>нажми и перейди на Таблицу с КОЛОДАМИ</NavLink>
            </div>
            <div>
                <NavLink to={'/profile'}>нажми и перейди на Profile</NavLink>
            </div>
        </div>
        <Outlet />
    </div>
)

*/

/*
import { useState } from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { DeleteIcon } from './assets/icons/deleteIcon.tsx'
import { EditIcon } from './assets/icons/editIcon.tsx'
import { Logout } from './assets/icons/iconLogOut.tsx'
import { IconMoreVerticalOutline } from './assets/icons/iconMoreVerticalOutline.tsx'
import { IconMyProfile } from './assets/icons/iconMyProfile.tsx'
import iconUser from './assets/icons/iconUser.png'
import { PlayIcon } from './assets/icons/playIcon.tsx'
import {
  Button,
  CardComponent,
  Checkbox2,
  CheckboxUniversal,
  DropDownComponent,
  Header,
  itemTabType,
  NameAndAvatarComponent,
  Pagination,
  PaginationAndSelect,
  PaginationSamurai,
  SelectControl,
  SliderBar,
  TableDecks,
  TableDecksWithSettings,
  TabPanel,
  TextField,
} from './components/ui'

export function App() {
  //1
  const [valueInput, setValueInput] = useState('')

  const handlerSendInputValue = (valueInput: string) => {
    alert(valueInput)
  }
  //2
  //SIDER
  const startArrayValue = [1, 100]
  const handlerOnValueCommit = (value: number[]) => {
    alert(`Вы поставили левый ползунок на ${value[0]}  а правый на ${value[1]}`)
  }
  //3
  //TABPANEL

  const [active, setActive] = useState('My')

  const handlerTabPanel1 = (name: string) => {
    alert(`Мне показалось или вы нажали кнопку ${name}...Перепроверьте лучше!`)
    setActive(name)
  }
  const handlerTabPanel2 = (name: string) => {
    alert(`Мне показалось или вы нажали кнопку ${name}...Перепроверьте лучше!`)
    setActive(name)
  }
  const handlerTabPanel3 = (name: string) => {
    alert(`Мне показалось или вы нажали кнопку ${name}...Перепроверьте лучше!`)
    setActive(name)
  }
  const dataTabPanel: itemTabType[] = [
    { id: 'tab1', name: 'My', onClick: handlerTabPanel1, disabled: false },
    { id: 'tab2', name: 'All', onClick: handlerTabPanel2, disabled: false },
    { id: 'tab3', name: 'Трейтья', onClick: handlerTabPanel3, disabled: false },
  ]
  //4
  //BUTTON
  const handlerOnClickButton = () => {
    alert(
      'Универсальная кнопка имеено для того чтоб на нее кликать, поэтому можете не стеснятся и смело продолжать, Все настроено и работает и ничего не сломается'
    )
  }
  //5
  //CHECKBOX
  const checkboxText = 'Некоторый текст'
  const [valueCheckboxTrue, setValueCheckboxTrue] = useState(true)
  /!*    const [valueCheckboxFalse,setValueCheckboxFalse] = useState(false)*!/

  const handlerOnChangeCheckbox = (value: boolean) => {
    setValueCheckboxTrue(value)
  }
  const [valueCheckboxFalse, setValueCheckboxFalse] = useState(false)
  const handlerOnChangeCheckbox1 = (value: boolean) => {
    setValueCheckboxFalse(value)
  }
  //6
  //SELECT
  const stateSelectItems = [
    { value: '11', text: 'Apple' },
    { value: '22', text: 'Banana' },
    { value: '33', text: 'AppleAndBanana' },
  ]
  let widthBlockSelector = 200
  let headerSelector = 'ВыбратьЧтоТо'
  const handlerOnValueChange = (value: string | undefined) => {
    alert(value ? value : 'underfined')
  }

  //PAGINATOR
  const handlerOnChange = (page: number) => {
    alert(page)
  }
  //Header
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handlerOnClick = () => {
    setIsLoggedIn(true)
  }
  //TABLE-DECKS
  const dataContentTable = [
    {
      title: 'Pack Name1',
      cardsCount: 10,
      updated: '2023-07-07',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name2',
      cardsCount: 5,
      updated: '2023-07-06',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name3',
      cardsCount: 8,
      updated: '2023-07-05',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name4',
      cardsCount: 3,
      updated: '2023-07-07',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name5',
      cardsCount: 12,
      updated: '2023-07-04',
      createdBy: 'Ivan Ivanov',
    },
  ]

  const dataHeadersTable = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'createdBy',
      title: 'Created by',
    },
  ]
  const sendDataToServer = (value: string) => {
    alert('sendDataToServer...   ' + value)
  }
  //DropDownMeny
  const functon1 = () => {
    alert('Есть реакция1')
  }
  const functon2 = () => {
    alert('Есть реакция2')
  }
  const functon3 = () => {
    alert('Есть реакция3')
  }
  const functon4 = () => {
    alert('Есть реакция4')
  }
  const functon5 = () => {
    alert('Есть реакция5')
  }

  const state1 = [
    {
      id: 1,
      icon: <IconMyProfile width="22" height="22" />,
      name: 'My Profile',
      callback: functon1,
    },
    { id: 2, icon: <Logout width="20" height="20" />, name: 'Sing Out', callback: functon2 },
  ]
  const state2 = [
    { id: 3, icon: <PlayIcon width="22" height="22" />, name: 'Learn', callback: functon3 },
    { id: 4, icon: <EditIcon width="20" height="20" />, name: 'Edit', callback: functon4 },
    { id: 5, icon: <DeleteIcon width="20" height="20" />, name: 'Delete', callback: functon5 },
  ]
  const dataHeader = {
    icon: <img src={iconUser} style={{ height: '50px' }} />,
    name: 'Павел',
    gmail: 'p&pavel@gmail.com',
  }

  return (
    <div>
      <div>
        <div>
          <TextField
            sizeWidthTextField="30rem"
            className={'sizeWidthTextField'}
            handlerOnChange={handlerSendInputValue}
            valueInput={valueInput}
            setValueInput={setValueInput}
            placeholder={'Input'}
            label={'Input'}
            type="email"
          />
        </div>
        <div>
          <TextField
            handlerOnChange={handlerSendInputValue}
            valueInput={valueInput}
            setValueInput={setValueInput}
            placeholder={'Input'}
            label={'Input'}
            type="password"
          />
        </div>
        <div>
          <TextField
            handlerOnChange={handlerSendInputValue}
            valueInput={valueInput}
            setValueInput={setValueInput}
            placeholder={'Input search'}
            type="text"
            showIconClose={true}
          />
          <TextField
            handlerOnChange={handlerSendInputValue}
            valueInput={valueInput}
            setValueInput={setValueInput}
            placeholder={'Input search'}
            type="text"
            showIconClose={false}
          />
        </div>
      </div>
      {/!* Slider*!/}
      <div>
        <SliderBar onValueCommit={handlerOnValueCommit} startArrayValue={startArrayValue} />
      </div>
      <div>
        {/!* TabPanel*!/}
        <TabPanel active={active} data={dataTabPanel} title="Title" />
      </div>
      {/!*Button*!/}
      <div>
        <Button onClick={handlerOnClickButton}>Hello</Button>

        <Button variant={'secondary'}>Hello</Button>

        <Button variant={'tertiary'}>Hello</Button>

        <Button variant={'link'}>Hello</Button>

        <Button as="a" href="http://www.staggeringbeauty.com/" target="_blank" variant={'link'}>
          накрути червяка
        </Button>

        <Button>
          <Logout width="23" height="23" /> Hello
        </Button>
      </div>
      {/!*CheckboxUniversal*!/}
      <div>
        <CheckboxUniversal
          disabled={false}
          checkboxText={checkboxText}
          onChange={handlerOnChangeCheckbox}
          value={valueCheckboxTrue}
        />
        <CheckboxUniversal
          disabled={false}
          checkboxText={checkboxText}
          onChange={handlerOnChangeCheckbox1}
          value={valueCheckboxFalse}
        />
      </div>
      {/!*SelectControl*!/}
      <div>
        <SelectControl
          onValueChange={handlerOnValueChange}
          headerSelector={headerSelector}
          widthBlockSelector={widthBlockSelector}
          stateSelectItems={stateSelectItems}
        />
      </div>
      <div>
        <CardComponent></CardComponent>
      </div>
      <div>
        <Checkbox2
          disabled={true}
          label={'disabled'}
          checked={valueCheckboxTrue}
          onChangeChecked={setValueCheckboxTrue}
        />
        <Checkbox2
          disabled={false}
          label={'checkbox'}
          checked={valueCheckboxTrue}
          onChangeChecked={setValueCheckboxTrue}
        />
      </div>

      <div>
        <div>
          <NavLink to={'/login'}>нажми и перейди на login</NavLink>
        </div>
        <div>
          <NavLink to={'/register'}>нажми и перейди на register</NavLink>
        </div>
        <div>
          <NavLink to={'/decks'}>нажми и перейди на Таблицу с КОЛОДАМИ</NavLink>
        </div>
        <div>
          <NavLink to={'/forgotYourPassword'}>нажми и перейди на ForgotYourPassword</NavLink>
        </div>
        <div>
          <NavLink to={'/checkEmail'}>нажми и перейди на CheckEmail</NavLink>
        </div>
        <div>
          <NavLink to={'/profile'}>нажми и перейди на Profile</NavLink>
        </div>
        <div>
          <NavLink to={'/editProfile'}>нажми и перейди на EditProfile</NavLink>
        </div>
        <div>
          <NavLink to={'/createNewPasswordComponent'}>
            нажми и перейди на CreateNewPasswordComponent
          </NavLink>
        </div>
        <Outlet />
      </div>
      <div style={{ padding: '8rem' }}>
        <Pagination count={1000} page={1} onChange={handlerOnChange} />
      </div>
      <div style={{ padding: '8rem' }}>
        <PaginationAndSelect />
      </div>
      <div style={{ padding: '12rem' }}>
        <PaginationSamurai allElements={1200} />
      </div>
      <div style={{ padding: '3rem' }}>
        <TableDecks
          dataContentTable={dataContentTable}
          dataHeadersTable={dataHeadersTable}
          sendDataToServer={sendDataToServer}
        />
      </div>
      <Header handlerOnClick={handlerOnClick} isLoggedIn={isLoggedIn} />
      <div style={{ padding: '3rem' }}>
        <TableDecksWithSettings />
      </div>
      <div style={{ padding: '5rem' }}>
        <NameAndAvatarComponent />
      </div>
      <div style={{ padding: '8rem' }}>
        <DropDownComponent
          data={state1}
          dataHeader={dataHeader}
          component={<NameAndAvatarComponent />}
        />
        <DropDownComponent
          data={state2}
          component={<IconMoreVerticalOutline width="33" height="33" />}
        />
      </div>
    </div>
  )
}

*/
