//board.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, ICreateBoard } from '../models/board.model';
import { AuthService } from './auth.service';

export interface ReordereSwimlaneDto {
  boardCod: number;
  id: ReordereSwimlaneItemDto[];
}

export interface ReordereSwimlaneItemDto {
  id: number;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  http = inject(HttpClient);

  createBoard(createBoard: ICreateBoard): Observable<IBoard> {
    return this.http.post<IBoard>('/api/board', createBoard);
  }
  updateSwimlaneOrder(reorder: ReordereSwimlaneDto): Observable<void> {
    return this.http.put<void>('/api/swimlane/update-order', reorder);
  }
  updateBoard(idBoard: number, createBoard: ICreateBoard): Observable<IBoard> {
    return this.http.patch<IBoard>(`/api/board/${idBoard}`, createBoard);
  }
  deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(`/api/board/${boardId}`);
  }
  getBoardById(idBoard: number): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/board/${idBoard}`);
  }
  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('/api/board');
  }

}