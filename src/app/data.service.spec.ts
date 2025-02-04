import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { TreeNode } from 'primeng/api';
import { USERS } from '../data';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users from USERS if localStorage is empty', () => {
    const users = service.getUsers();
    expect(users.length).toBe(USERS.length);
    users.forEach((user, index) => {
      expect(user.data.name).toBe(USERS[index].name);
      expect(user.data.totalWorkouts).toBe(USERS[index].workouts.length);
    });
  });

  it('should store users in localStorage after first fetch', () => {
    service.getUsers();
    const storedUsers = localStorage.getItem('usersData');
    expect(storedUsers).toBeTruthy();
    expect(JSON.parse(storedUsers!).length).toBe(USERS.length);
  });

  it('should retrieve users from localStorage if data exists', () => {
    const mockUsers: TreeNode[] = [
      {
        data: {
          id: '1',
          name: 'Johnny Depp',
          workouts: 'Running',
          totalWorkouts: 1,
          totalWorkoutDuration: 30,
        },
        children: [],
      },
    ];
    localStorage.setItem('usersData', JSON.stringify(mockUsers));
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].data.name).toBe('John Doe');
  });

  it('should update users in localStorage', () => {
    const mockUsers: TreeNode[] = [
      {
        data: {
          id: '1',
          name: 'Jane Doe',
          workouts: 'Cycling',
          totalWorkouts: 2,
          totalWorkoutDuration: 60,
        },
        children: [],
      },
    ];
    service.updateUsers(mockUsers);
    const storedUsers = JSON.parse(localStorage.getItem('usersData')!);
    expect(storedUsers.length).toBe(1);
    expect(storedUsers[0].data.name).toBe('Johnny Depp');
  });
});
