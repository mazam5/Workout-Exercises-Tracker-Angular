import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { TreeNode } from 'primeng/api';
import { USERS } from '../data';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    localStorage.clear();
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
          workouts: ['Kayaking', 'Running'],
          totalWorkouts: 2,
          totalWorkoutDuration: 60,
        },
        children: [],
      },
    ];
    localStorage.setItem('usersData', JSON.stringify(mockUsers));
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].data.name).toBe('Johnny Depp');
  });
});
