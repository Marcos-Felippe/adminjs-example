import AdminJS from 'adminjs';
import uploadFeature from '@adminjs/upload';
import * as path from "path";
import Task from '../models/task';
import credentials from "../config/credentials";

export default {
    resource: Task,
    options: {
        parent: {
            icon: "Task",
        },
        properties: {
            id: {
                position: 1,
            },
            title: {
                position: 2,
                isRequired: true,
            },
            description: {
                position: 3,
                type: "richtext",
                isVisible: { list: false, filter: false, show: true, edit: true },
            },
            due_date: {
                position: 4,
                isRequired: true,
            },
            effort: {
                position: 5,
                isRequired: true,
            },
            order: {
                position: 6,
            },
            status: {
                position: 7,
                isRequired: true,
                availableValues: [
                    { value: "backlog", label: "Backlog" },
                    { value: "doing", label: "Em Execução" },
                    { value: "done", label: "Pronto" },
                    { value: "approved", label: "Aprovado" },
                    { value: "rejected", label: "Rejeitado" },
                ],
            },
            userId: {
                position: 8,
                isRequired: true,
            },
            user_id: {
                isVisible: false,
            },
            projectId: {
                position: 9,
                isRequired: true,
                isVisible: { list: false, filter: true, show: true, edit: true },
            },
            project_id: {
                isVisible: false,
            },

            createdAt: {
                position: 10,
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            updatedAt: {
                position: 11,
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            attachment: {
                position: 12,
            },
            path: {
                isVisible: false,
            },
            folder: {
                isVisible: false,
            },
            type: {
                isVisible: false,
            },
            filename: {
                isVisible: false,
            },
            size: {
                isVisible: false,
            },
        },
    },
    features:[ uploadFeature({
        provider: {
            // aws: credentials,
            local: {
                bucket: 'uploads'
            }
        },

        properties: {
            key: "path",
            bucket: "folder",
            mimeType: "type",
            size: "size",
            filename: "filename",
            file: "attachment",
        },

        validation: {
            mimeTypes: [
                'image/png',
                'application/pdf'
            ],
        },
    })],
};