package com.boot.rest.base.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import com.boot.rest.base.model.User;

public interface UserService {

	public User insert(User userVO);

	public List<User> findAll();

	@PreAuthorize("hasRole('admin')")
	public void delete(int id);

	public User findById(int id);

	public User updateUser(int id, User userVO);
}
